import Loader from "@/components/core/Loader";
import { RegistrationForm } from "@/components/forms";
import PublicLayout from "@/layouts/public";
import { useState } from "react";
// import Image from "next/image";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Home() {
  return (
    <PublicLayout title="Register">
      <main className="bg-blue-200/20 flex justify-center items-center py-10 md:py-20">
        <article className="main-container">
          <section className="h-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl bg-white shadow-md overflow-hidden">
            <aside className="hidden w-full lg:grid place-items-center h-full bg-primary/5">
              <img className="w-full" src="/register.png" alt="form-image" />
            </aside>
            <aside className="w-full h-full rounded-3xl flex flex-col">
              <div className="border-b-2 border-primary">
                <p className="title-styling text-center p-4">Create Account</p>
              </div>
              <RegistrationForm />
            </aside>
          </section>
        </article>
      </main>
    </PublicLayout>
  );
}
