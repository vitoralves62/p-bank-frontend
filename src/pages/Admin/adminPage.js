import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import styles from "./adminPage.module.css";
import Background from "../../components/Background/bg";
import logoArkadia from "../../assets/Arkadia_Logo_Preto_e_Branco.png";
import "bootstrap/dist/css/bootstrap.css";

function AdminPage() {
  const { control, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const onSubmit = (data) => {
    setUsers([...users, data]);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleOpenEditModal = (index) => {
    const user = users[index];
    setEditName(user.name);
    setEditEmail(user.email);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { name: editName, email: editEmail };
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  return (
    <main>
      <Background />
      <div className={styles.BG}>
        <div className={styles.Container}>
          <div className={styles.Row}>
            <div className={styles.leftColumn}>
              <img
                src={logoArkadia}
                alt="Ícone da Aplicação"  
                className={styles.logoArkadia} 
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="exampleInputName1" className="form-label">
                    Nome
                  </label>
                  <br></br>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="form-control-lg"
                        id="exampleInputName1"
                        placeholder="Digite o nome"
                      />
                    )}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Endereço de e-mail
                  </label>
                  <br></br>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Digite o endereço de e-mail"
                      />
                    )}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Criar
                </button>
              </form>
            </div>
            <div className={styles.rightColumn}>
              <h1>Usuários Criados</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <MdEdit
                          onClick={() => handleOpenEditModal(index)}
                          className={styles.editIcon}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        />
                        <FaTrash
                          onClick={() => handleDeleteUser(index)}
                          className={styles.deleteIcon}
                          style={{ cursor: "pointer" }}
                        />
                        <Modal
                          show={showEditModal}
                          onHide={handleCloseEditModal}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Editar Usuário</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputName1"
                                className="form-label"
                              >
                                Nome
                              </label>
                              <br></br>
                              <input
                                type="text"
                                className="form-control-lg"
                                id="exampleInputName1"
                                style={{ fontSize: "medium" }}
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Endereço de e-mail
                              </label>
                              <br></br>
                              <input
                                type="email"
                                className="form-control-lg"
                                id="exampleInputEmail1"
                                style={{ fontSize: "medium" }}
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                              />
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseEditModal}
                            >
                              Fechar
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleEditUser(index)}
                            >
                              Salvar Alterações
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminPage;
