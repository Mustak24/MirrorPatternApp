import UserNameModal from "@/Shared/Components/UI/Modals/UserNameModal";
import { useAppStore } from "@/Shared/Stores/App";
import { useState } from "react";

export default function WelcomeModal() {

    const isNewUser = useAppStore(store => store.isNewUser);

    const [visible, setVisible] = useState(isNewUser);

    return (
        <UserNameModal
            type="CREATE"
            visible={visible}
            setVisible={setVisible}
        />
    )
}