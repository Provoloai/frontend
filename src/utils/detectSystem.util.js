export const detectSystem = () => {
  const userAgent = navigator.userAgent || (window).opera;

  if (/android/i.test(userAgent)) return "android";

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "ios";

  if (
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      userAgent.toLowerCase()
    )
  )
    return "tablet";

  return "unknown";
};