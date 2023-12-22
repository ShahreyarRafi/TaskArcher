import Tasks from './Tasks';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



const AllTasksPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Tasks></Tasks>
        </DndProvider>

    );
};

export default AllTasksPage;