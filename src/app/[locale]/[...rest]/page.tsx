import { notFound } from "next/navigation";

/** Routes deeper than one segment that are not yet implemented fall through to 404. */
export default function CatchAllPage() {
  notFound();
}
