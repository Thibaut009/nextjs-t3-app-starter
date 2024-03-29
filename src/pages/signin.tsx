import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import Style from "../styles/signin.module.css";

// Import BuiltInProviderType from the correct module
import { BuiltInProviderType } from "next-auth/providers";

type ProviderStyles = {
  [key in BuiltInProviderType]: {
    buttonClass: string | undefined;
    logoClass: string | undefined;
    buttonTextClass: string | undefined;
  };
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const providerStyles = {
    google: {
      buttonClass: Style.google_signin_button,
      logoClass: Style.google_logo,
      buttonTextClass: Style.button_text,
    },
    discord: {
      buttonClass: Style.discord_signin_button,
      logoClass: Style.discord_logo,
      buttonTextClass: Style.button_text,
    },
    github: {
      buttonClass: Style.github_signin_button,
      logoClass: Style.github_logo,
      buttonTextClass: Style.button_text,
    },
    // Veuillez noter que nous n'ajoutons pas d'autres fournisseurs ici
  } as ProviderStyles;
  
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {Object.values(providers).map((provider) => {
          const providerStyle = providerStyles[provider.id as BuiltInProviderType];
          if (!providerStyle) return null;
          return (
            <div key={provider.name}>
              <button
                className={providerStyle.buttonClass}
                onClick={() => signIn(provider.id)}
              >
                <span className={providerStyle.logoClass}></span>
                <span className={providerStyle.buttonTextClass}>
                  Sign in with {provider.name}
                </span>
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
