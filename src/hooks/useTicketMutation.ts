import { useMutation } from "@tanstack/react-query";
import { ApiResponse, SubmitTicketData } from "@/types/liveChat";

export function useTicketMutation(onSuccessCallback?: () => void) {
  // const url = `${import.meta.env.VITE_SERVER_URL}`;

  return useMutation<ApiResponse, Error, SubmitTicketData>({
    mutationFn: async (data: SubmitTicketData) => {
      const formDataObj = new FormData();
      formDataObj.append("name", data.name);
      formDataObj.append("email", data.email);
      formDataObj.append("message", data.message);

      if (data.subject) {
        formDataObj.append("subject", data.subject);
      }

      data.files.forEach(file => {
        formDataObj.append("attachments", file);
      });

      const NODE_ENV = (import.meta.env.VITE_NODE_ENV as string) || "";
      const SERVER_URL = (import.meta.env.VITE_SERVER_URL as string) || "";
      const apiBase =
        NODE_ENV === "development" && SERVER_URL
          ? SERVER_URL.replace(/\/$/, "")
          : "/api";

      const url = `${apiBase}${"/support/ticket"}`;

      const response = await fetch(url, {
        method: "POST",
        body: formDataObj,
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      // Get response text first
      const responseText = await response.text();

      // Try to parse as JSON
      let responseData: ApiResponse;
      try {
        responseData = responseText
          ? JSON.parse(responseText)
          : {
              success: false,
              message: "Empty response from server",
              title: "Server Error",
            };
      } catch {
        throw new Error(
          `Invalid JSON response: ${responseText.substring(0, 100)}`
        );
      }

      if (!response.ok) {
        throw new Error(
          responseData.message || `Server error: ${response.status}`
        );
      }

      return responseData;
    },
    onSuccess: () => {
      // Call the callback if provided
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
}
