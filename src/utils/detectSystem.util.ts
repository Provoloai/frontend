type SystemType = "android" | "ios" | "tablet" | "unknown";

export const detectSystem = (): SystemType => {
  const userAgent = navigator.userAgent || (window as any).opera;

  if (/android/i.test(userAgent)) return "android";

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) return "ios";

  if (
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      userAgent.toLowerCase()
    )
  )
    return "tablet";

  return "unknown";
};