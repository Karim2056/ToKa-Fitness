import "./Home.css"
import LoggedHeader from "../../components/LoggedHeader/LogedHeader"
import LoggedFooter from "../../components/LoggedFooter/LoggedFooter"

export default function Home() {

    return (
        <>
            <LoggedHeader />
            <div className="home-body">
                1. finish settings page
                <br/> 2. finish home page
                <br/> 3. allow user to log in and subscribe
                <br/> 4. use backend when necessary (saving workout plans, meals, chats)
            </div>
            <LoggedFooter />
        </>
    )
}