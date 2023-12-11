import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    return redirect('/builder');
  }

  return (
    <div className="relative  dark:bg-zinc-900">
      <div className="wrapper overflow-hidden">
        <div className="relative z-10 pt-10 lg:w-full lg:max-w-2xl">
          <div className="relative py-32 sm:py-40">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                A form builder that doesn&apos;t suck.
              </h1>
              <p className="mt-6 text-lg leading-8">
                When I apply to companies they don&apos;t they need proof I can do the job.
                This is that proof. Feast your eyes on this fully functioning website.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link className="btn" href="/builder">
                  Try it now
                </Link>
                
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}