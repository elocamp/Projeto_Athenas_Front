import { Button, Snackbar, Select, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import './PostPessoa.css';

const PostPessoa = () => {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    sexo: '',
    altura: '',
    peso: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'sexo' && !['M', 'H'].includes(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/pessoas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSnackbarMessage("Pessoa adicionada com sucesso!");
        setSnackbarOpen(true);
        navigate("/");
      } else {
        throw new Error('Erro ao adicionar a pessoa.');
      }
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Erro ao adicionar a pessoa.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="center-form">
      <Typography variant="h4" gutterBottom>
        Criar Nova Pessoa
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          type="text"
          name="nome"
          variant="filled"
          fullWidth
          margin="normal"
          value={formData.nome}
          onChange={handleInputChange}
        />
        <TextField
          label="Data de Nascimento"
          type="date"
          name="dataNascimento"
          variant="filled"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.dataNascimento}
          onChange={handleInputChange}
        />
        <TextField
          label="CPF"
          type="text"
          name="cpf"
          variant="filled"
          fullWidth
          margin="normal"
          value={formData.cpf}
          onChange={handleInputChange}
        />
        <Select
          label="Sexo"
          name="sexo"
          variant="filled"
          fullWidth
          margin="normal"
          value={formData.sexo}
          onChange={handleInputChange}
        >
          <MenuItem value="M">Feminino</MenuItem>
          <MenuItem value="H">Masculino</MenuItem>
        </Select>
        <TextField
          label="Altura"
          type="number"
          name="altura"
          variant="filled"
          fullWidth
          margin="normal"
          value={formData.altura}
          onChange={handleInputChange}
        />
        <TextField
          label="Peso"
          type="number"
          name="peso"
          variant="filled"
          fullWidth
          margin="normal"
          value={formData.peso}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Post Pessoa
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PostPessoa;
