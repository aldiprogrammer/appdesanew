
import Navbar from "./Navbar";

export default function Home() {
    return (
        <>
            <Navbar />

            <section
                id="profil"
                className="bg-gray-150 text-white py-20"
            >

                <div className="grid grid-cols-2 px-20">
                    <div>
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio eum corporis laudantium molestias. Nihil minus laboriosam libero consectetur hic neque, fugiat quidem doloribus et eum eaque, ab repellat quas necessitatibus?
                    </div>
                </div>

            </section>
        </>
    );
}