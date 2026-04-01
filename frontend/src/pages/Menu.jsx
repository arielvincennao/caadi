/**
 * Menu
 * Responsabilidades:
 * - Armar el menú leyendo las secciones desde Supabase (`section`)
 * - Mostrar opciones para navegar a cada sección con su ícono y slug
 * - Detectar si el usuario es admin y mostrarle opciones extra (agregar/eliminar oficinas y secciones)
 */

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Card from "../components/common/Card";
import BtnBack from "../components/common/BtnBack";
import { supabase } from "../../db/supabaseClient";

/**
 * Menu
 * Responsabilidades:
 * - Exponer la entrada a las distintas secciones
 * - Permitir agregar/eliminar secciones y agregar oficinas (puntos en el mapa)
 * - Permitir edición si el usuario es admin
 */

function Menu() {
  const [menuOptions, setMenuOptions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {

      //vemos si hay user, si hay implica que es admin. seteamos si es true
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setIsAdmin(true);
      }

      //independientemente si es user traemos la data de las secciones (para mostrar a cual podemos navegar)
      const { data, error } = await supabase
        .from("section")
        .select("title, icon, slug, position")
        .order("position", { ascending: true });

      if (error) {
        console.error("Error:", error);
        return;
      }


      //metemos las secciones en una lista para iterarlas y mostrarlas. solo guardamos titulo, icono y slug, lo demas es innecesario
      const options = (data || []).map((item) => ({
        title: item.title,
        icon: item.icon,
        to: `/seccion/${item.slug}`,
      }));

      setMenuOptions(options);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>
      <section className="flex flex-col items-center pb-10 pt-20 md:pt-4">
        <Title className="m-4 md:text-2xl">Menú principal</Title>
        <ul className="space-y-5">

          {/* UI render de las secciones */}
          {menuOptions.map((option) => (
            <li key={option.title}>
              <Card icon={option.icon} to={option.to} className="text-start">
                <span>{option.title}</span>
              </Card>
            </li>
          ))}


          <li key="reclamos-accesibilidad">
            <Card icon="reclamos" to="/reclamos" className="text-start">
              <span>Reclamos de accesibilidad</span>
            </Card>
          </li>

          {/* Si es admin mostramos UI para agregar/eliminar secciones y agregar oficinas */}
          {isAdmin && (
            <>
              <li key="agregar-seccion">
                <Card
                  icon="add"
                  to="/agregar-seccion"
                  className="text-start border-dashed border-2 border-blue-500 bg-blue-50 opacity-90"
                >
                  <span className="font-bold text-blue-700 underline italic">Agregar una sección</span>
                </Card>
              </li>
              <li key="eliminar-seccion">
                <Card
                  icon="delete"
                  to="/eliminar-seccion"
                  className="text-start border-dashed border-2 border-blue-500 bg-blue-50 opacity-90"
                >
                  <span className="font-bold text-blue-700 underline italic">Eliminar una sección</span>
                </Card>
              </li>

              <li key="agregar-oficina">
                <Card
                  icon="office"
                  to="/admin/oficinas"
                  className="text-start justify-center border-dashed border-2 border-blue-500 bg-blue-50 opacity-90"
                >
                  <span className="font-bold text-blue-700 underline italic">Gestionar oficinas del mapa</span>
                </Card>
              </li>
            </>
          )}
        </ul>

      </section>
    </div>
  );
}

export default Menu;