import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

export default function MapBlock({ block }) {
    const navigate = useNavigate();
    const { section, officeId, mapTitle, title } = block;

    const handleNavigation = () => {
        const params = new URLSearchParams();

        if (section) {
            params.append('section', section);
        }
        
        if (officeId) {
            params.append('officeId', officeId);
        }

        if (mapTitle) {
            params.append('mapTitle', mapTitle);
        }

        const queryString = params.toString();

        if (queryString) {
            navigate(`/mapa?${queryString}`);
        } else {
            navigate('/mapa');
        }
    };

    return (
        <Button onClick={handleNavigation}>
            {title || "Ver ubicación"}
        </Button>
    );
}