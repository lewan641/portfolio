"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, ShoppingBasket, Wifi, WifiOff } from "lucide-react";

type Sale = { n: number; op: string };
type Line = { id: number; text: string; kind: "out" | "ok" | "warn" };

const newOp = () => Math.random().toString(16).slice(2, 8);

/**
 * A working miniature of how KOGA's point of sale survives a lost connection.
 * Sell while offline → sales wait in a local queue → going online replays them in order.
 * "Send last request again" shows the idempotency key doing its job: the server answers
 * from its operation log instead of recording the sale twice.
 */
export function OfflineDemo() {
  const [online, setOnline] = useState(true);
  const [queue, setQueue] = useState<Sale[]>([]);
  const [server, setServer] = useState<Sale[]>([]);
  const [log, setLog] = useState<Line[]>([{ id: 0, text: "ready — sell something, then switch the internet off", kind: "out" }]);
  const count = useRef(0);
  const lineId = useRef(0);
  const saved = useRef(new Set<string>()); // operation ids the "server" has already processed
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const say = (text: string, kind: Line["kind"]) =>
    setLog((l) => [...l.slice(-5), { id: ++lineId.current, text, kind }]);

  /** The "API": the same operation id is only ever recorded once. */
  const post = (sale: Sale) => {
    say(`POST /api/sales   operationId=${sale.op}`, "out");
    timers.current.push(setTimeout(() => {
      if (saved.current.has(sale.op)) {
        say(`200  already processed — returned saved result, nothing written`, "warn");
      } else {
        saved.current.add(sale.op);
        setServer((s) => [...s, sale]);
        say(`201  sale #${sale.n} saved`, "ok");
      }
    }, 450));
  };

  const sell = () => {
    const sale = { n: ++count.current, op: newOp() };
    if (online) post(sale);
    else {
      setQueue((q) => [...q, sale]);
      say(`offline — sale #${sale.n} kept on this device`, "warn");
    }
  };

  // back online: replay the queue one sale at a time, oldest first
  useEffect(() => {
    if (!online || queue.length === 0) return;
    const t = setTimeout(() => {
      post(queue[0]);
      setQueue((q) => q.slice(1));
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- post only touches refs and setters
  }, [online, queue]);

  const reset = () => {
    timers.current.forEach(clearTimeout); timers.current = [];
    saved.current.clear(); count.current = 0;
    setQueue([]); setServer([]); setOnline(true);
    setLog([{ id: ++lineId.current, text: "ready — sell something, then switch the internet off", kind: "out" }]);
  };

  const last = server[server.length - 1];

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <p className="label text-dim">Live demo — runs in your browser, no server involved</p>
        <button onClick={reset} className="label inline-flex items-center gap-2 text-dim transition-colors hover:text-ink">
          <RotateCcw className="size-3.5" /> Reset
        </button>
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-3">
        {/* 1 — the till */}
        <div className="bg-panel p-5 sm:p-7">
          <p className="label text-dim">1 · Point of sale</p>
          <div className="mt-5 flex flex-col gap-3">
            <button onClick={sell} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-dim active:scale-[.98]">
              <ShoppingBasket className="size-4" /> Sell an item
            </button>
            <button
              onClick={() => { setOnline((o) => !o); say(online ? "— connection lost —" : "— connection restored —", "warn"); }}
              role="switch"
              aria-checked={online}
              className="flex items-center justify-between gap-3 rounded-full border border-line bg-raised py-2 pl-5 pr-2 text-sm"
            >
              <span className="flex items-center gap-2">{online ? <Wifi className="size-4" /> : <WifiOff className="size-4" />}Internet {online ? "on" : "off"}</span>
              <span className={`flex h-7 w-12 items-center rounded-full p-1 transition-colors ${online ? "bg-dim" : "bg-bg"}`}>
                <span className={`size-5 rounded-full bg-ink transition-transform ${online ? "translate-x-5" : ""}`} />
              </span>
            </button>
            <button onClick={() => last && post(last)} disabled={!last} className="rounded-full border border-line px-5 py-3 text-sm transition-colors hover:bg-raised disabled:opacity-40">
              Send last request again
            </button>
          </div>
        </div>

        {/* 2 — the device queue */}
        <div className="bg-panel p-5 sm:p-7">
          <p className="label flex justify-between text-dim"><span>2 · Waiting on the device</span><span className="text-ink">{queue.length}</span></p>
          <ul className="mt-5 flex min-h-24 flex-wrap content-start gap-2">
            {queue.length === 0 && <li className="text-sm text-dim">Empty. Nothing is waiting to be sent.</li>}
            {queue.map((s) => (
              <li key={s.op} className="pop rounded-full border border-dim px-3 py-1.5 font-mono text-xs">#{s.n} · {s.op}</li>
            ))}
          </ul>
        </div>

        {/* 3 — the database */}
        <div className="bg-panel p-5 sm:p-7">
          <p className="label flex justify-between text-dim"><span>3 · Saved in the database</span><span className="text-ink">{server.length}</span></p>
          <ul className="mt-5 flex min-h-24 flex-wrap content-start gap-2">
            {server.length === 0 && <li className="text-sm text-dim">No sales yet.</li>}
            {server.map((s) => (
              <li key={s.op} className="pop rounded-full bg-dim px-3 py-1.5 font-mono text-xs text-bg">#{s.n} · {s.op}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line bg-bg px-5 py-4 font-mono text-xs leading-relaxed sm:px-7" aria-live="polite">
        {log.map((l) => (
          <p key={l.id} className={`pop whitespace-pre-wrap ${l.kind === "ok" ? "text-ink" : "text-dim"}`}>
            <span className="mr-3 select-none text-line">{l.kind === "out" ? "→" : l.kind === "ok" ? "✓" : "!"}</span>{l.text}
          </p>
        ))}
      </div>
    </div>
  );
}
