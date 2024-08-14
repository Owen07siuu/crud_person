import PropTypes from 'prop-types'
import { Person } from './Person';
import { useState } from 'react';

export const People = ({ persons, setPersons }) => {
  //estado para identificar a la persona que se esta editando
  const [editingId, setEditingId] = useState(null);
  //estado para la persona que se edito
  const [editedPerson, setEditedPerson] = useState({
    name:'',
    role:'',
    img:'',
  });

  //Estado para establecer si se esta editando
  const [isEditing, setIsEditing] = useState(false);

 //metodo para capturar los datos de una persona
  const handleChange = (e) => {
      const  {name, value} = e.target;
      setEditedPerson(prevState => ({
        ...prevState,
        [name]: value
      }) )
  }

  //metodo para crear nuevo empleado
  const handleCreate = (e) => {
    setPersons([...persons, {id: persons.length +1, ...editedPerson}]);

    //resetear variable de estado edited person
    setEditedPerson({name: '', role:'', img:','});
  }

  //metdo para editar los datos de una persona
  const handleEdit =(id, e) =>{
    //Establecemos id a editar
    setEditingId(id);

    //Activarel estado de edicion
    setIsEditing(true);

    //buscar la persona a editar
    const personToEdit = persons.find(person => person.id === id);

    setEditedPerson({...personToEdit});
  }

  //metodo para actualizar los datos modificados
  const handleSave = (e) => {

    //prevenir que el navegador se actualice
    e.preventDefault();
    //Actualizar el estado de persons al guardar los datos modificados
    const updatedPersons = persons.map(person =>person.id === editingId ? editedPerson:
      person);

    setPersons(updatedPersons);

    //desactivar el estado de edicion
    setIsEditing(false);

    //resetear la variable de estado
    setEditingId(null);

    //resetear el edited person
    setEditedPerson({name: '', role:'', img:','});
  }
  return (
    <div>
      <h2 className='text-center my-4'>IT Team</h2>
        <div className='container'>
       <div className='row d-flex flex-wrap row-cols-1
       row-cols-md-2 row-cols-lg-3'>
          {persons.map((person) => {
            return (
              <div key={person.id}>
                <Person
                  id={person.id}
                  name={person.name}
                  img={person.img}
                  role={person.role}
                  handleEdit={() => handleEdit(person.id)}

            />
              </div>
            );
          })}
       </div>
        </div>
  <div className='container mt-4 row p-2'>
    <h2 className='text-center my-4'>{isEditing ? 'Actualizar empleado' : 'Crear nuevo empleado'}</h2>
        <form className='border border-dark rounded p-4'>
  <div className="mb-3">
    <label className="form-label">Nombres</label>
    <input type="text" name="name" value={editedPerson.name} onChange={handleChange} className="form-control" aria-describedby="nombre" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Cargo</label>
    <input type="text" name='role' value={editedPerson.role} onChange={handleChange} className="form-control"  />
  </div>
  <div className="mb-3">
    <label  className="form-label">Avatar</label>
    <input type="text" name='img' value={editedPerson.img} onChange={handleChange} className="form-control"  />
  </div>
  <button type="submit" className="btn btn-primary" onClick={isEditing ? handleSave : handleCreate}>{isEditing ? 'Modificar' : 'Crear'}</button>
</form>
        </div>
    </div>
  )
}

People.propTypes = {
    persons: PropTypes.array,
    setPersons: PropTypes.func
}