"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFetchImage } from "@/app/hooks/usefetchimages"; // Correct import

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Fetch images using useFetchImage
  const { imageUrl: logoUrl, error: logoError } = useFetchImage("logo.png");
  const { imageUrl: profileUrl, error: profileError } =
    useFetchImage("profile.png");

  console.log("Logo URL:", logoUrl);
  console.log("Profile URL:", profileUrl);

  // Hide navbar on /auth/login or /auth/register
  if (pathname === "/auth/login" || pathname === "/auth/register") {
    return null;
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              {logoUrl ? (
                <img
                  alt="Company Logo"
                  src={logoUrl}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <p>Loading logo...</p>
              )}
              {logoError && (
                <p className="text-red-500">Error loading logo: {logoError}</p>
              )}
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/courses"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Courses
                </Link>
                <Link
                  href="/my-courses"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  My Courses
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notifications Button */}
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {profileUrl ? (
                    <img
                      alt="User Profile"
                      src={profileUrl}
                      className="size-8 rounded-full object-cover"
                    />
                  ) : (
                    <p>Loading profile...</p>
                  )}
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <Link href="/profile">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </button>
                </Link>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link href="/courses">
            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Browse Courses
            </button>
          </Link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
