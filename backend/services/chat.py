from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.vector_stores.chroma import ChromaVectorStore
import chromadb
import os
from dotenv import load_dotenv
from llama_index.llms.groq import Groq
from llama_index.core import Settings
from llama_index.core.prompts import PromptTemplate

load_dotenv()

# Reutilizamos la misma configuración de persistencia
DB_PATH = "./data/chroma_db"
COLLECTION_NAME = "documentos_usuario"

def consultar_chat(pregunta: str):
    db = chromadb.PersistentClient(path=DB_PATH)
    chroma_collection = db.get_or_create_collection(COLLECTION_NAME)
    
    # Ver cuántos documentos hay en la colección
    print("Total docs en ChromaDB:", chroma_collection.count())
    # Ver un sample del contenido
    sample = chroma_collection.peek(limit=2)
    print("Sample documentos:", sample["documents"])

    
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    
    index = VectorStoreIndex.from_vector_store(vector_store)
    
    llm = Groq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY"),
        system_prompt="""Eres un asistente experto que solo responde basándose en el contexto proporcionado.
        Reglas estrictas:
        - Si la respuesta no está en el contexto, di claramente: "Lo siento, esa información no se encuentra en los documentos proporcionados."
        - No intentes responder usando tu conocimiento general ni inventes información.
        - Mantén la respuesta concisa y profesional."""
    )
    
    query_engine = index.as_query_engine(llm=llm)
    
    response = query_engine.query(pregunta)
    return response.response  # ✅