import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./../globals.css";
import './Dashboard.css'



export const metadata = {
	title: "EduTech - Dashboard",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (

		<>
			<Header />
			<main>
				<div className="main__container">
					<Sidebar />
					{children}
				</div>
			</main>

		</>

	);
}
