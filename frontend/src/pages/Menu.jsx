import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Card from "../components/common/Card";
import BtnBack from "../components/common/BtnBack";
import { supabase } from "../../db/supabaseClient";

function Menu() {
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase
        .from("section")
        .select("title, icon, slug, position")
        .order("position", { ascending: true }); //Ordena los items del menu por posición. Si se creara un nuevo item, se debe adjuntar la posición.

      if (error) {
        console.error("Error:", error);
        return;
      }

      const options = (data || []).map((item) => ({
        title: item.title,
        icon: item.icon,
        to: `/${item.slug}`,
      }));

      setMenuOptions(options);
    }

    fetchMenu();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>
      <section className="flex flex-col items-center pb-10 pt-20 md:pt-4">
        <Title className="m-4 md:text-2xl">Menú principal</Title>
        <ul className="space-y-5">
          {menuOptions.map((option) => (
            <li key={option.title}>
              <Card icon={option.icon} to={option.to} className="text-start">
                <span>{option.title}</span>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>  
  )
}

export default Menu

