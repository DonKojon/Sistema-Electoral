-- Tabla: Estudiante
CREATE TABLE Estudiante (
    idEstudiante INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    ci VARCHAR(100), -- CI cifrado (AES-256)
    matricula VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL, -- Hash SHA-256
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    INDEX idx_matricula (matricula)
);

-- Tabla: Administrador
CREATE TABLE Administrador (
    idAdmin INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: TribunalElectoral
CREATE TABLE TribunalElectoral (
    idTribunal INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: ActoElectoral
CREATE TABLE ActoElectoral (
    idEleccion INT PRIMARY KEY AUTO_INCREMENT,
    idTribunal INT,
    inicio DATETIME NOT NULL,
    cierre DATETIME NOT NULL,
    estado ENUM('pendiente', 'activa', 'cerrada') DEFAULT 'pendiente',
    FOREIGN KEY (idTribunal) REFERENCES TribunalElectoral(idTribunal),
    INDEX idx_tribunal (idTribunal)
);

-- Tabla: Candidato
CREATE TABLE Candidato (
    idCandidato INT PRIMARY KEY AUTO_INCREMENT,
    idEleccion INT,
    nombre VARCHAR(100) NOT NULL,
    partido VARCHAR(50) NOT NULL,
    FOREIGN KEY (idEleccion) REFERENCES ActoElectoral(idEleccion)
);

-- Tabla: Mesa
CREATE TABLE Mesa (
    idMesa INT PRIMARY KEY AUTO_INCREMENT,
    idEleccion INT,
    FOREIGN KEY (idEleccion) REFERENCES ActoElectoral(idEleccion)
);

-- Tabla: Voto
CREATE TABLE Voto (
    idVoto INT PRIMARY KEY AUTO_INCREMENT,
    idEstudiante INT,
    idCandidato INT,
    idMesa INT,
    idEleccion INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    hashTransaccion VARCHAR(64),
    FOREIGN KEY (idEstudiante) REFERENCES Estudiante(idEstudiante),
    FOREIGN KEY (idCandidato) REFERENCES Candidato(idCandidato),
    FOREIGN KEY (idMesa) REFERENCES Mesa(idMesa),
    FOREIGN KEY (idEleccion) REFERENCES ActoElectoral(idEleccion),
    CONSTRAINT unique_vote UNIQUE (idEstudiante, idEleccion),
    INDEX idx_voto_estudiante (idEstudiante),
    INDEX idx_voto_candidato (idCandidato)
);

-- Tabla: Blockchain
CREATE TABLE Blockchain (
    idBlock INT PRIMARY KEY AUTO_INCREMENT,
    idMesa INT,
    hashBlock VARCHAR(64) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idMesa) REFERENCES Mesa(idMesa),
    INDEX idx_blockchain_hash (hashBlock)
);

-- Tabla: Auditoria
CREATE TABLE Auditoria (
    idEvento INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    accion VARCHAR(100) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    detalles TEXT
);