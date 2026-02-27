import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

export default function MapBlock({ block }) {
    const navigate = useNavigate();
    const { section, institutionId, title } = block;

    const handleNavigation = () => {
        const params = new URLSearchParams();

        if (section) {
            params.append('section', section);
        }
        
        if (institutionId) {
            params.append('institutionId', institutionId);
        }

        const queryString = params.toString();

        if (queryString) {
            navigate(`/map?${queryString}`);
        } else {
            navigate('/map');
        }
    };

    return (
        <Button onClick={handleNavigation}>
            {title || "Ver ubicación"}
        </Button>
    );
}