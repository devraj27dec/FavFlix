import { columns } from "@/components/columns";
import { DataTable } from "@/components/DataTable";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { MovieDialog } from "@/components/MovieDialog";
import { api } from "@/config/api";
import type { MovieData } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'





export default function Movies() {
  const token = localStorage.getItem("access_token");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  console.log(token, "token");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/movie/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  const handleUpdate = async(id:number) => {
    const movie = movies.find((m:MovieData) => m.mid === id);

    if(!movie) return
    setSelectedMovie(movie);
    setIsEdit(true);
    setOpen(true);
  }

  const handleDelete = async(id:number)=> {
    try {
      await api.delete(`/movie/delete/${id}` , {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      toast.success("Movie Deleted Successfully")
      fetchMovies();
    } catch (error) {
      console.log(error)
    }
  }

  const handleAdd = () => {
    setSelectedMovie(null);
    setIsEdit(false);
    setOpen(true);
  };

  const handleSubmit = async (data: MovieData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("director", data.director);
      formData.append("type", data.type);
      formData.append("budget", String(data.budget));
      formData.append("location", data.location);
      formData.append("duration", data.duration);
      formData.append("year", data.year);

      if (data.image) {
        formData.append("image", data.image);
      }
      console.log("image" , data.image)

      if (isEdit && selectedMovie) {
        await api.post(`/movie/update/${selectedMovie.mid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Movie Updated Successfully")
      } else {
        console.log("Adding new movie:", data);
        await api.post(`/movie/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Movie Added Successfully")
      }
      fetchMovies();
    } catch (error) {
      console.log("Submission Failed", error);
      if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Something went wrong!");
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };


  return (
    <div>
      <Header />
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        ) : (
          <DataTable data={movies || []} columns={columns(handleUpdate , handleDelete)} onAdd={handleAdd}/>
        )}
      </div>

      <MovieDialog
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        open={open}
        initialData={selectedMovie}
        isEdit={isEdit}      
      />
    </div>
  );
}
