import { createStore } from "@funtools/store";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({id: 'app-store'});

const isNewUser = storage.contains('user-name') === false;

if(isNewUser) {
    storage.set('user-name', 'Guest');
}

const userName = storage.getString('user-name') ?? 'Guest';

const {useStore, useHandlers} = createStore({
    states: {
        userName,
        isNewUser,
    },
    syncHandlers: {
        updateUserName: (states, name) => {
            states.userName = name;
            storage.set('user-name', name);
        }
    }
});


export {
    useStore as useAppStore,
    useHandlers as useAppHandlers,
}