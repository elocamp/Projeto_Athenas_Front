import { Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Dashboard = () => {
  const [pessoas, setPessoas] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const fetchPessoas = async () => {
    try {
      const response = await fetch("http://localhost:8080/pessoas");
      const result = await response.json();
      setPessoas(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  const handlePostPessoa = () => {
    navigate("/pessoas");
  };

  const handleDelete = async (pessoaId) => {
    try {
      const response = await fetch(`http://localhost:8080/pessoas/${pessoaId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        fetchPessoas();
      }
      console.log(pessoaId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (pessoaId) => {
    navigate(`/pessoas/${pessoaId}`);
  };

  const handleInfo = async (pessoaId) => {
    try {
      const response = await fetch(`http://localhost:8080/pessoas/${pessoaId}/pesoIdeal`);
      if (response.ok) {
        const pesoIdeal = await response.json();
        setSnackbarMessage(`Peso Ideal: ${pesoIdeal.toFixed(2)} kg`);
        setSnackbarOpen(true);
      } else {
        throw new Error('Erro ao obter o peso ideal da pessoa.');
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Erro ao obter o peso ideal da pessoa.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formatDataNascimento = (data) => {
    if (!data) return "";
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Container className="mt-4">
      <Button
        variant="contained"
        color="primary"
        onClick={handlePostPessoa}
        style={{ marginBottom: 5 }}
      >
        Postar Pessoa
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        Pessoas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Altura</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pessoas.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell>{pessoa.nome}</TableCell>
                <TableCell>{formatDataNascimento(pessoa.dataNascimento)}</TableCell>
                <TableCell>{pessoa.cpf}</TableCell>
                <TableCell>{pessoa.sexo}</TableCell>
                <TableCell>{pessoa.altura}</TableCell>
                <TableCell>{pessoa.peso}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdate(pessoa.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(pessoa.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => handleInfo(pessoa.id)}
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="info"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
