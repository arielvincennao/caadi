import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Subsubtitle } from "../Typography";
import { Icon } from "../common/Icon";

export default function Step({ step: initialStep }) {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStep(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // TODO: await ContentBlockService.update(...)
      setIsEditing(false);
    } catch (err) {
      console.error("Error guardando paso:", err);
    }
  };

  return (
    <li className={`flex items-start gap-4 my-4 p-2 rounded-lg transition-all relative group ${isEditing ? "bg-blue-50 ring-1 ring-blue-100" : ""}`}>

      {isAuthenticated && (
        <div className="absolute top-0 right-0 flex gap-1 translate-y-[-50%] group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white p-1 rounded-full shadow-md hover:bg-blue-700"
              title="Editar Paso"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          ) : (
            <div className="flex gap-1">
              <button onClick={handleSave} className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">OK</button>
              <button onClick={() => { setIsEditing(false); setStep(initialStep); }} className="bg-gray-500 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">X</button>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col items-center flex-shrink-0">
        <Icon name={step.icon} className={`w-10 h-10 ${isEditing ? 'opacity-40' : ''}`} />
        {isEditing && (
          <input
            name="icon"
            value={step.icon || ""}
            onChange={handleChange}
            className="mt-1 text-[9px] w-12 p-0.5 border rounded text-center bg-white outline-none focus:border-blue-400"
            placeholder="Icono"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-blue-600">Paso</span>
              <input
                name="id"
                type="number"
                value={step.id || ""}
                onChange={handleChange}
                className="w-10 text-sm font-bold border-b border-blue-400 bg-transparent outline-none"
              />
            </div>
            <textarea
              name="description"
              value={step.description || ""}
              onChange={handleChange}
              rows={2}
              className="text-sm w-full p-2 border rounded bg-white outline-none focus:border-blue-400"
            />
          </div>
        ) : (
          <>
            <Subsubtitle className="md:text-xl">Paso {step.id}</Subsubtitle>
            <p className="text-gray-700">{step.description}</p>
          </>
        )}
      </div>
    </li>
  );
}
