import { LogOut } from "lucide-react";
import React from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import useAuthStore from "../stores/authStore";
// import { LogOut } from "lucide-react";

export const MobilePageModal = ({ operatingSystem }) => {

  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });

  const signOut = useAuthStore((state) => state.signOut);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleSignOut = async () => {
    try {
      clearAuth();
      await signOut();
      navigate({ to: "/login", replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
      clearAuth();
      navigate({ to: "/login", replace: true });
    }
  };

  return (

    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full my-auto">
        <div className="p-6 rounded-lg text-center justify-center">
          <div className='w-full text-center flex justify-center'>

            <svg width="154" height="124" viewBox="0 0 154 124" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M134.392 34.8555C136.666 34.8555 138.51 33.0119 138.51 30.7377C138.51 28.4635 136.666 26.6199 134.392 26.6199C132.118 26.6199 130.274 28.4635 130.274 30.7377C130.274 33.0119 132.118 34.8555 134.392 34.8555Z" fill="#EAEEF9" />
              <path d="M140.418 18.7861C141.971 18.7861 143.23 17.527 143.23 15.9739C143.23 14.4208 141.971 13.1617 140.418 13.1617C138.865 13.1617 137.605 14.4208 137.605 15.9739C137.605 17.527 138.865 18.7861 140.418 18.7861Z" fill="#EAEEF9" />
              <path d="M28.3969 17.576C29.95 17.576 31.209 16.3169 31.209 14.7638C31.209 13.2107 29.95 11.9517 28.3969 11.9517C26.8438 11.9517 25.5847 13.2107 25.5847 14.7638C25.5847 16.3169 26.8438 17.576 28.3969 17.576Z" fill="#F1F3F9" />
              <path d="M11.2226 71.8108C14.107 71.8108 16.4452 69.4726 16.4452 66.5882C16.4452 63.7038 14.107 61.3656 11.2226 61.3656C8.33823 61.3656 6 63.7038 6 66.5882C6 69.4726 8.33823 71.8108 11.2226 71.8108Z" fill="#EAEEF9" />
              <path d="M77.0072 102.041C105.129 102.041 127.927 79.2428 127.927 51.0207C127.927 22.7986 105.028 0 77.0072 0C48.8855 0 26.0869 22.7986 26.0869 51.0207C26.0869 79.2428 48.8855 102.041 77.0072 102.041Z" fill="#EAEEF9" />
              <g filter="url(#filter0_d_567_19684)">
                <path d="M131.653 16.8693V85.2206C131.653 88.2132 129.229 90.6671 126.237 90.6671H27.9893C24.9967 90.6671 22.5427 88.2431 22.5427 85.2206V16.8693C22.5427 13.8767 24.9667 11.4527 27.9893 11.4527H126.237C129.229 11.4527 131.653 13.8767 131.653 16.8693Z" fill="url(#paint0_linear_567_19684)" />
              </g>
              <path d="M131.653 16.8693V22.5254H22.5427V16.8693C22.5427 13.8767 24.9667 11.4527 27.9893 11.4527H126.237C129.229 11.4527 131.653 13.8767 131.653 16.8693Z" fill="#D5DDEA" />
              <path d="M28.438 18.4553C29.2643 18.4553 29.9343 17.7854 29.9343 16.959C29.9343 16.1326 29.2643 15.4627 28.438 15.4627C27.6116 15.4627 26.9417 16.1326 26.9417 16.959C26.9417 17.7854 27.6116 18.4553 28.438 18.4553Z" fill="#989FB0" />
              <path d="M32.927 18.4553C33.7534 18.4553 34.4233 17.7854 34.4233 16.959C34.4233 16.1326 33.7534 15.4627 32.927 15.4627C32.1006 15.4627 31.4307 16.1326 31.4307 16.959C31.4307 17.7854 32.1006 18.4553 32.927 18.4553Z" fill="#989FB0" />
              <path d="M37.386 18.4553C38.2123 18.4553 38.8823 17.7854 38.8823 16.959C38.8823 16.1326 38.2123 15.4627 37.386 15.4627C36.5596 15.4627 35.8896 16.1326 35.8896 16.959C35.8896 17.7854 36.5596 18.4553 37.386 18.4553Z" fill="#989FB0" />
              <path d="M61.6561 31.3237H32.1489V60.4965H61.6561V31.3237Z" fill="#D5DDEA" />
              <path d="M102.075 31.1768H122.436" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M70.2622 31.1768H93.1676" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M70.2622 40.7207H122.436" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M91.2588 50.2647H122.436" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M70.2622 50.2647H83.6237" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M70.2622 59.8085H98.8939" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M93.1675 69.3524H122.435" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M32.0864 69.3524H84.2598" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M61.3545 78.8963H99.5301" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M32.0864 78.8963H52.4468" stroke="#D6DCE8" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M139.326 99.3231H110.635C108.363 99.3231 106.529 97.4895 106.529 95.217V39.1005C106.529 36.8279 108.363 34.9944 110.635 34.9944H139.326C141.599 34.9944 143.432 36.8279 143.432 39.1005V95.217C143.432 97.4895 141.599 99.3231 139.326 99.3231Z" fill="url(#paint1_linear_567_19684)" />
              <path d="M138.37 90.207H111.591C110.738 90.207 110.067 89.5356 110.067 88.6834V40.1593C110.067 39.3071 110.738 38.6357 111.591 38.6357H138.37C139.223 38.6357 139.894 39.3071 139.894 40.1593V88.6834C139.894 89.5356 139.223 90.207 138.37 90.207Z" fill="#F4F6FA" />
              <path d="M124.994 96.5599C126.177 96.5599 127.137 95.6002 127.137 94.4164C127.137 93.2327 126.177 92.273 124.994 92.273C123.81 92.273 122.85 93.2327 122.85 94.4164C122.85 95.6002 123.81 96.5599 124.994 96.5599Z" fill="#AAB2C5" />
              <defs>
                <filter id="filter0_d_567_19684" x="0.542725" y="0.452698" width="153.111" height="123.214" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="11" />
                  <feGaussianBlur stdDeviation="11" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_19684" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_19684" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_567_19684" x1="77.0625" y1="9.62039" x2="77.0625" y2="91.5211" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FDFEFF" />
                  <stop offset="0.9964" stop-color="#ECF0F5" />
                </linearGradient>
                <linearGradient id="paint1_linear_567_19684" x1="111" y1="40" x2="136" y2="95.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#B0BACC" />
                  <stop offset="1" stop-color="#969EAE" />
                </linearGradient>
              </defs>
            </svg>

          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-2 mt-10 text-gray-400">
            Switch Devices
          </h1>
          <p className="text-center text-gray-400 lg:w-2/3 mx-auto text-sm">
            It looks like you're browsing on a mobile device ({operatingSystem}).
            This page is best viewed on a laptop or tablet.
            Please switch to a larger screen to continue.
          </p>
          {/* <p className="mt-4 text-sm text-gray-400">Please switch to a desktop or tablet to continue.</p> */}
        </div>

        <button
          onClick={handleSignOut}
          className="text-left text-red-400 transition-all duration-300 rounded-md p-3 flex align-middle gap-3 hover:bg-red-50 mx-auto"
        >
          <LogOut size={20} />
          Log Out
        </button>

      </div>
    </div>
  );
}