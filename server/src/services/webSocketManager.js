import { ApiGatewayManagementApi } from '@aws-sdk/client-apigatewaymanagementapi';
import { AWS_CONFIG } from '../config/aws.js';

export class WebSocketManager {
  constructor() {
    this.connections = new Set();
    this.apiGateway = new ApiGatewayManagementApi(AWS_CONFIG);
  }

  async addConnection(connectionId) {
    this.connections.add(connectionId);
  }

  async removeConnection(connectionId) {
    this.connections.delete(connectionId);
  }

  async sendToConnection(connectionId, data) {
    try {
      await this.apiGateway.postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(data)
      });
    } catch (error) {
      if (error.statusCode === 410) {
        this.connections.delete(connectionId);
      }
    }
  }

  async broadcastToGame(gameId, data) {
    const connections = Array.from(this.connections);
    await Promise.all(
      connections.map(connectionId =>
        this.sendToConnection(connectionId, data)
      )
    );
  }
}