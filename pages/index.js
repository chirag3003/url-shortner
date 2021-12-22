import { useState } from "react";
import Head from "next/head";
import { Scissors, Copy } from "react-feather";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [shortUrl, setShortUrl] = useState(null);
	const [longURL, setLongURL] = useState("");
	const shortenURl = (evt) => {
		evt.preventDefault();
		axios
			.post("/api/", { longURL: longURL.trim() })
			.then((res) => setShortUrl(res.data.shortUrl))
			.catch((err) => {
				setShortUrl(null);
				toast.error("Error generating URL", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
				});
			});
	};
	const copyURL = () => {
		try {
			navigator.clipboard.writeText(shortUrl);
			toast.success("URL copied!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Url Shortner</title>
				<meta name="description" content="Url Shortner by Bravo68Web" />
				<link rel="icon" href="/favicon.png" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to URL SHORTNER!</h1>

				<div className={styles.card}>
					<h2>Paste the URL to be Shortened</h2>
					<form onSubmit={shortenURl} className="input">
						<input
							name="longURL"
							type="text"
							value={longURL}
							onChange={(evt) => setLongURL(evt.target.value)}
						/>
						<button type="submit">
							<Scissors /> Shorten It
						</button>
					</form>
				</div>
				{shortUrl && (
					<div className={styles.card}>
						<div className={styles.shortUrl}>
							<h3>{shortUrl}</h3>
							<div onClick={copyURL} className="copy">
								<Copy />
							</div>
						</div>
					</div>
				)}
			</main>

			<footer className={styles.footer}>
				<p>
					Made with ♥ by <a href="https://chirag.codes">Chirag Bhalotia</a> and{" "}
					<a href="https://bravo68web.me">Bravo</a>
				</p>
			</footer>
		</div>
	);
}
