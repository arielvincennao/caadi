import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

export default function MapBlock({ block, isEditing, isAdmin, onChange }) {
    const navigate = useNavigate();
    const [data, setData] = useState(block.data || {});
    const [localEditing, setLocalEditing] = useState(false);

    useEffect(() => {
      setData(block.data || {});
    }, [block.data]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      const updated = { ...data, [name]: value };
      setData(updated);
      onChange && onChange(block.id, updated);
    };

    const { section, officeId, title } = data;

    const handleNavigation = () => {
        const params = new URLSearchParams();

        if (section) {
            params.append('section', section);
        }
        
        if (officeId) {
            params.append('id', officeId);
        }

        if (title) {
            params.append('title', title);
        }

        const queryString = params.toString();

        if (queryString) {
            navigate(`/map?${queryString}`);
        } else {
            navigate('/map');
        }
    };

    return (
        <div className="relative">
          {isAdmin && isEditing && (
            <div className="absolute top-1 right-2 z-10">
              {!localEditing ? (
                <button onClick={() => setLocalEditing(true)} className="p-1 bg-blue-600 text-white rounded-full cursor-pointer">✏️</button>
              ) : (
                <button onClick={() => setLocalEditing(false)} className="p-1 bg-gray-500 text-white rounded-full cursor-pointer">✖</button>
              )}
            </div>
          )}
          {isAdmin && isEditing && localEditing && (
            <div className="mb-3 p-2 bg-white border rounded">
              <input
                name="title"
                value={data.title || ""}
                onChange={handleChange}
                placeholder="Etiqueta"
                className="w-full mb-1 p-1 border rounded"
              />
              <input
                name="section"
                value={data.section || ""}
                onChange={handleChange}
                placeholder="Sección (slug)"
                className="w-full mb-1 p-1 border rounded"
              />
              <input
                name="officeId"
                value={data.officeId || ""}
                onChange={handleChange}
                placeholder="Office ID"
                className="w-full p-1 border rounded"
              />
            </div>
          )}
          <Button onClick={handleNavigation}>
            {title || "Ver ubicación"}
          </Button>
        </div>
    );
}

MapBlock.hasEditor = true;
