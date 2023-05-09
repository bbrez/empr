export interface Position {
    lat: number;
    long: number;
}

export interface Area {
    position: Position;
    radius: number;
}

export interface Meeting {
    position: Position;
    time: Date;
}