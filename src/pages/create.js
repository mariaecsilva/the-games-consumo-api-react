import Head from "next/head";
import Container from "@/components/Container/index";
import Menu from "@/components/Menu/Menu";
import Footer from "@/components/Footer/Footer";
import CreateContent from "@/components/CreateContent/CreateContent";

export default function Homepage() {
    return (
        <>
            <Head>
                <title>The Games &copy; 2024</title>
                <meta
                    name="description"
                    content="Consumo em React de uma API de Games"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Menu />
                <Container>
                    <CreateContent />
                </Container>
                <Footer />
            </main>
        </>
    );
}
