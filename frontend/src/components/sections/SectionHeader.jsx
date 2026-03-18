import { StorageService } from "../../api/services/StorageService";
import { Title, Text } from "../Typography";

export default function SectionHeader({ data, isEditing, onChange, setEditData }) {
    return (
        <section className="flex flex-col items-center text-center md:text-left md:items-start mb-8 w-full">
            <div className="w-full relative mb-6">
                {data.image && (
                    <img
                        src={data.image}
                        alt={data.title}
                        className={`w-full max-h-64 md:max-h-96 object-cover rounded-lg ${isEditing ? 'opacity-50 ring-4 ring-blue-400' : ''}`}
                    />
                )}
                {isEditing && (
                    <div className="mt-2">
                        <label className="text-sm font-bold text-gray-600 uppercase cursor-pointer hover:text-blue-600">Seleccionar nueva imagen
                            <input
                                type="file"
                                accept="image/*"

                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    try {
                                        const url = await StorageService.uploadImage('section_covers', file);
                                        setEditData(prev => ({ ...prev, image: url }));
                                    } catch (err) {
                                        console.error("Error subiendo imagen:", err);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>

            <div className="w-full mb-2">
                {isEditing ? (
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-blue-600 uppercase">Título</label>
                        <input
                            name="title"
                            value={data.title || ""}
                            onChange={onChange}
                            className="text-3xl font-bold border-b-2 border-blue-500 bg-transparent outline-none w-full py-2"
                        />
                    </div>
                ) : (
                    <Title>{data.title}</Title>
                )}
            </div>

            <div className="w-full mb-4">
                {isEditing ? (
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-blue-600 uppercase">Descripción</label>
                        <textarea
                            name="description"
                            value={data.description || ""}
                            onChange={onChange}
                            rows={4}
                            className="w-full p-3 border-2 border-blue-100 rounded-lg outline-none focus:border-blue-500 bg-white"
                        />
                    </div>
                ) : (
                    <Text>{data.description}</Text>
                )}
            </div>
        </section>
    );
}