Challenge Técnico Laravel + React

1. Clonar el repositorio

2. Construir y levantar los contenedores

    Correr docker-compose up --build -d desde el directorio raiz del proyecto (donde se encuentra el archivo docker-compose.yml)

3. Acceder al contenedor del backend: docker exec -it challenge-tecnico-backend-1 /bin/bash

    Correr migraciones y seeds para Espacios y usuario Admin: php artisan migrate --seed
    Iniciar el servidor: php artisan serve --host=0.0.0.0 --port=8000
    Backend corriendo en http://localhost:8000

4. Correr el frontend

    Navegar al directorio correspondiente: cd frontend
    npm install
    npm run dev

    La aplicacion estara disponible en http://localhost:5173

Para logearse como administrador: http://localhost:5173/admin

Usuario administrador:
    Email: admin@neosistemas.com
    Contraseña: admin

Como gestor de base de datos, utilice phpMyAdmin, corriendo en http://localhost:8080

    Usuario: challenge
    Contraseña: root