import { useNavigate, useParams } from "react-router-dom";
import { Button, Snackbar, Select, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MuiAlert from '@mui/material/Alert';
import './UpdatePessoa.css';

const UpdatePessoa = () => {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState({
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

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        const response = await fetch(`http://localhost:8080/pessoas/${id}`);
        if (response.ok) {
          const result = await response.json();
          setPessoa(result);
        } else {
          throw new Error('Erro ao obter os dados da pessoa.');
        }
      } catch (error) {
        console.log(error);
        setSnackbarMessage("Erro ao carregar dados da pessoa.");
        setSnackbarOpen(true);
      }
    };

    fetchPessoa();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'sexo' && !['M', 'H'].includes(value)) {
      return;
    }
    setPessoa({
      ...pessoa,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/pessoas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pessoa)
      });
      if (response.ok) {
        setSnackbarMessage("Pessoa atualizada com sucesso!");
        setSnackbarOpen(true);
        navigate("/");
      } else {
        throw new Error('Erro ao atualizar a pessoa.');
      }
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Erro ao atualizar a pessoa.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="center-form">
      <Typography variant="h4" gutterBottom>
        Update Pessoa
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          type="text"
          name="nome"
          variant="filled"
          fullWidth
          margin="normal"
          value={pessoa.nome}
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
          value={pessoa.dataNascimento}
          onChange={handleInputChange}
        />
        <TextField
          label="CPF"
          type="text"
          name="cpf"
          variant="filled"
          fullWidth
          margin="normal"
          value={pessoa.cpf}
          onChange={handleInputChange}
        />
        <Select
          label="Sexo"
          name="sexo"
          variant="filled"
          fullWidth
          margin="normal"
          value={pessoa.sexo}
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
          value={pessoa.altura}
          onChange={handleInputChange}
        />
        <TextField
          label="Peso"
          type="number"
          name="peso"
          variant="filled"
          fullWidth
          margin="normal"
          value={pessoa.peso}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Update Pessoa
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

export default UpdatePessoa;
