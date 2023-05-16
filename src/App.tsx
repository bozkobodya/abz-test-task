import React from 'react';
import {Header} from "./ui/compounds/header/Header";
import {GreetingSection} from "./sections/greetingSection/GreetingSection";
import {UsersSection} from "./sections/usersSection/UsersSection";
import {SignUpSection} from "./sections/signUpSection/SignUpSection";

function App() {
    return (
        <>
            <Header />
            <main className="flex flex-col gap-[140px] max-w-[1170px] mx-auto mb-[100px]">
                <GreetingSection />
                <UsersSection />
                <SignUpSection />
            </main>
        </>
    );
}

export default App;
