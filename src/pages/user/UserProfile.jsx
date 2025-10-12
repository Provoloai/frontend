import TextInputField from "../../Reusables/TextInputField";
import { Link, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import useSession from "../../hooks/useSession";
import { getCustomerPortalUrl } from "../../server/checkout";
import { GenerateAvatar } from "../../Reusables/GenerateAvatar";
import provoolosvg from "../../assets/img/Provoloaisvg.png";
import CustomSnackbar from "../../Reusables/CustomSnackbar";

export default function Example() {
  const { user, loading: loadingUserData } = useSession();

  const [touched, setTouched] = useState({
    name: false,
    title: false,
    description: false,
  });
  const [error] = useState("");

  const [profileLink, setProfileLink] = useState("");

  const [portalLoading, setPortalLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSubscriptionPortal = async () => {
    if (!user?.polarId) {
      setSnackbarMessage("No subscription found. Please contact support.");
      setSnackbarOpen(true);
      return;
    }
    setPortalLoading(true);
    try {
      const url = await getCustomerPortalUrl(user);
      if (url) window.location.href = url;
    } catch (e) {
      setSnackbarMessage(e instanceof Error ? e.message : "Unable to open subscription portal.");
      setSnackbarOpen(true);
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <form className="flex-1 flex flex-col overflow-y-auto relative h-screen px-20">
      <div className="space-y-10  m-auto max-w-3xl ">
        <div className="border-b border-gray-900/10 pb-5">
          <div className="grid grid-cols-1 gap-x-6  sm:grid-cols-6 ">
            <div className="grid grid-cols-2 align-middle gap-5 items-center">
              {loadingUserData ? (
                <div className="size-12 rounded-full bg-gray-300 animate-pulse"></div>
              ) : (
                <GenerateAvatar name={user?.displayName} size={48} />
              )}

              <p className="text-3xl font-medium">
                {user?.displayName || user?.email?.split("@")[0] || "User"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-10 ">
          <h2 className="text-base text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <TextInputField
                id="fullname"
                label="UserName"
                placeholder="John Doe"
                iconStart={<UserRound size={20} />}
                value={user?.displayName}
                disabled
              />
            </div>

            <div className="sm:col-span-3">
              <TextInputField
                id="email"
                type="email"
                label="Email Address"
                placeholder="example@mail.com"
                iconStart={<Mail size={20} />}
                value={user?.email}
                disabled
              />
            </div>

            <div className="sm:col-span-6 ">
              <TextInputField
                id="profileLink"
                label="Profile Link"
                placeholder="https://www.upwork.com/Profile-link"
                iconStart={<Link size={20} />}
                value={profileLink}
                onChange={(e) => setProfileLink(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, profileLink: true }))}
                touched={touched.profileLink || error}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F3F4F5] p-6 rounded-xl border border-gray-300 grid lg:grid-cols-3 lg:gap-0 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-3 justify-between lg:pr-20 pr-5">
            <p className="text-sm font-headingmd">🎉 Thanks for joining Provolo!</p>
            <p className="text-sm text-gray-500">
              This page shows the details you’ve shared with us. We’ll use this to help optimize
              your Upwork profile and improve your chances of winning more jobs.
            </p>
            <p className="text-sm text-gray-500">
              Need to update or remove any of your information? Reach out to us anytime at{" "}
              <a href="mailto:heyprovolo@gmail.com" className="underline">
                Heyprovolo@gmail.com{" "}
              </a>
              and we’ll take care of it.
            </p>
            {user?.polarId && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={openSubscriptionPortal}
                  disabled={portalLoading}
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {portalLoading && (
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  Manage Subscription
                </button>
              </div>
            )}
          </div>

          <div className="lg:border-l-2 lg:pt-0 pt-10 border-gray-300 border-dashed flex items-center">
            <a
              href={"https://linktr.ee/Provoloai"}
              target="_blank"
              rel="noreferer noopener"
              className=" flex flex-col ml-auto items-end justify-between"
            >
              <img
                alt="Provolo"
                src={provoolosvg}
                className="w-[80%] opacity-80 hover:opacity-100 duration-300 transition-all rounded-2xl"
              />
              <p className="text-xs text-gray-400">Scan QR</p>
            </a>
          </div>
        </div>

        {/* Notifications */}
        <div className="border-b border-gray-900/10 pb-12 hidden">
          <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to
            hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">By email</legend>
              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultChecked
                        id="comments"
                        name="comments"
                        type="checkbox"
                        aria-describedby="comments-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p id="comments-description" className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        aria-describedby="candidates-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p id="candidates-description" className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">Push notifications</legend>
              <p className="mt-1 text-sm/6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    defaultChecked
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      
      <CustomSnackbar
        snackbarMessage={snackbarMessage}
        snackbarColor="danger"
        open={snackbarOpen}
        close={() => setSnackbarOpen(false)}
      />
    </form>
  );
}
