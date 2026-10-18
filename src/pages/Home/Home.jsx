import "./Home.css"
import LoggedHeader from "../../components/LoggedHeader/LogedHeader"
import LoggedFooter from "../../components/LoggedFooter/LoggedFooter"

export default function Home() {

    return (
        <>
            <LoggedHeader />
            <div className="home-body">
                hi
            </div>
            <LoggedFooter />
        </>
    )
}