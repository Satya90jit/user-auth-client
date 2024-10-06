import { LoginForm } from "@/components/forms";
import PublicLayout from "@/layouts/public";
import React from "react";

const LoginPage = () => {
  return (
    <PublicLayout title="Login">
      <main className="bg-blue-200/20 flex justify-center items-center py-10 md:py-20">
        <article className="main-container">
          <section className="h-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl bg-white shadow-md overflow-hidden">
            <aside className="hidden w-full lg:grid place-items-center h-full bg-primary/5">
              <img
                className="w-full h-[30rem] object-contain"
                src="/login.png"
                alt="form-image"
              />
            </aside>
            <aside className="w-full h-full rounded-3xl flex flex-col">
              <div className="border-b-2 border-primary">
                <p className="title-styling text-center text-blue-900 p-4">
                  Login
                </p>
              </div>
              <LoginForm />
            </aside>
          </section>
        </article>
      </main>
    </PublicLayout>
  );
};

export default LoginPage;
