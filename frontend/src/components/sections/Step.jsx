import { useState, useEffect } from "react";
import { Subsubtitle } from "../Typography";
import { Icon } from "../common/Icon";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";
import BtnControl from "../common/BtnControl";

export default function Step({ step: initialStep, stepNumber, isEditing: sectionEditing, isAdmin, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStep(prev => ({ ...prev, [name]: value }));
  };

  //se eliminó la lógica de back porque ya se resuelve en section
  const handleSave = () => {
    if (onUpdate) onUpdate(step);
    setIsEditing(false);
  };

  //se eliminó la lógica de back porque se resuelve en section y el reload que refrescaba toda la página innecesariamente.
  const handleDelete = () => {
    if (onDelete) onDelete(step.id);
  };

  return (
    <li className={`flex items-start gap-4 my-4 p-2 rounded-lg transition-all relative group
      ${isEditing
        ? "flex flex-col md:flex-row md:items-start md:gap-4" // editando: columna en mobile, fila en desktop
        : "flex items-start gap-4" // normal: fila siempre
      }
    ${isEditing ? "bg-blue-50 ring-1 ring-blue-100" : ""}`}>

      {isAdmin && sectionEditing && (
        <div className="absolute top-0 right-2 flex gap-1 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          {!isEditing ? (
            <>
              <BtnControl onClick={() => setIsEditing(true)}
                title={"Editar paso"}
                className={"p-2 bg-blue-600 hover:bg-blue-700 text-white"}>
                <Icon name={"editar"} className={"w-5 h-5"} />
              </BtnControl>


              <BtnControl onClick={handleDelete}
                title={"Eliminar item"}
                className="bg-red-600 hover:bg-red-700 p-2"
              >
                <Icon name={"eliminar"} className={"w-5 h-5"} />
              </BtnControl>
            </>
          ) : (
            <div className="flex gap-1 mt-1">
              <button onClick={handleSave} className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm cursor-pointer">OK</button>
              <button onClick={() => { setIsEditing(false); setStep(initialStep); }} className="bg-gray-500 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm cursor-pointer">X</button>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col items-center shrink-0">
        <Icon name={step.icon} className={`w-10 h-10 ${isEditing ? 'opacity-40' : ''}`} />
        {isEditing && (
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600">Icono</span>
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border rounded mt-1">
              {ICON_OPTIONS.map((ico) => (
                <button
                  key={ico}
                  type="button"
                  onClick={() => setStep(prev => ({ ...prev, icon: ico }))}
                  className={`p-1 border rounded flex justify-center items-center ${step.icon === ico ? "bg-blue-200 ring-2 ring-blue-400" : ""
                    }`}
                >
                  <Icon name={ico} className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-bold text-blue-600">Descripción</label>
            <textarea
              name="description"
              value={step.description || ""}
              onChange={handleChange}
              rows={11}
              className="text-sm w-full p-2 border rounded bg-white outline-none focus:border-blue-400"
            />
          </div>
        ) : (
          <>
            <Subsubtitle className="md:text-xl">Paso {stepNumber}</Subsubtitle>
            <p className="text-gray-700">{step.description}</p>
          </>
        )}
      </div>
    </li>
  );
}
