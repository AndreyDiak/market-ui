import { useAuth } from "@/hooks/useAuth";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
   return <main className={styles.main}>Main page</main>;
}
