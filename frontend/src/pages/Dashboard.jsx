import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export function Dashboard(){
    return <div>
    <Appbar></Appbar>
    <Balance value="$1000"></Balance>
    <Users></Users>
    </div>
}