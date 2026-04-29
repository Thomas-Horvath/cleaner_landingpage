"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { fetchAdminSession, getAdminSessionFromStorage, loginAdmin } from "@/lib/admin-api";

const DASHBOARD_PATH = "/muhely-felulet";

export function AdminLoginShell() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkExistingSession() {
      const storedSession = getAdminSessionFromStorage();

      if (!storedSession) {
        if (isMounted) {
          setIsCheckingSession(false);
        }
        return;
      }

      try {
        const session = await fetchAdminSession();

        if (!isMounted) {
          return;
        }

        if (session) {
          router.replace(DASHBOARD_PATH);
          return;
        }
      } catch {
        // Ha a session ellenőrzés hibázik, a felhasználó marad a login oldalon.
      }

      if (isMounted) {
        setIsCheckingSession(false);
      }
    }

    checkExistingSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await loginAdmin({ username, password });
      router.push(DASHBOARD_PATH);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Nem sikerült a belépés.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-space">
      <Container>
        <div className="panel mx-auto max-w-[760px] p-6 sm:p-8">
          <p className="eyebrow">Belépés</p>
          <h1 className="headline mt-4 text-3xl text-slate-900 sm:text-4xl">Szolgáltatói felület</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Ezen a felületen lehet majd kezelni a beérkező foglalásokat, áttekinteni a függőben
            lévő kéréseket és ellenőrizni az időpontokat.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Felhasználónév
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                placeholder="Pl. muhelygazda"
                autoComplete="username"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-foreground">
              Jelszó
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-md border border-border/70 bg-white px-4 py-3 text-sm"
                placeholder="Jelszó"
                autoComplete="current-password"
                required
              />
            </label>

            {errorMessage ? (
              <p className="rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                {errorMessage}
              </p>
            ) : null}

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-sm text-muted transition hover:text-foreground">
                Vissza a főoldalra
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || isCheckingSession}
                className="button-primary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCheckingSession ? "Ellenőrzés..." : isSubmitting ? "Belépés folyamatban..." : "Belépés"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
