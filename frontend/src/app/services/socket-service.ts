import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private readonly serverUrl = 'http://localhost:3005';
  private connectionStatus$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializeSocket();
    this.setupConnectionListeners();
  }

  private initializeSocket(): void {
    this.socket = io(this.serverUrl, {
      transports: ['websocket'],
    });
  }

  private setupConnectionListeners(): void {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.connectionStatus$.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.connectionStatus$.next(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  on<T = any>(event: string, callback: (data: T) => void): void {
    this.socket.on(event, callback);
  }

  emit<T = any>(event: string, data?: T): void {
    if (this.isConnected()) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  }

  off(event: string, callback?: (...args: any[]) => void): void {
    this.socket.off(event, callback);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus$.asObservable();
  }

  public waitForConnection(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isConnected()) {
        resolve();
      } else {
        this.getConnectionStatus().subscribe(connected => {
          if (connected) {
            resolve();
          }
        });
      }
    });
  }
}
