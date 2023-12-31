import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    // Render a simple welcome message and a link to sign in for unauthorized users
    return (
      <div className="container mx-auto flex w-full flex-col items-center justify-start space-y-8 pt-8 sm:w-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Icons.logo />
        </div>
        <h1 className="font-bold text-3xl text-center">Добро пожаловать</h1>
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Войти
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Ваша новостная лента</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* subreddit info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-customColor px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5 text-white">
              <HomeIcon className="h-4 w-4" />
              Главная страница
            </p>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Ваша персональная новостная лента. Здесь вы найдете последние
                сообщения из ваших любимых сообществ.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-4",
              })}
              href={`/r/create`}
            >
              Создать сообщество
            </Link>
            <Link
              className={buttonVariants({
                className: "w-full mb-6",
              })}
              href={"/allCommunities"}
            >
              Все сообщества
            </Link>
          </dl>
        </div>
      </div>
    </>
  );
}
