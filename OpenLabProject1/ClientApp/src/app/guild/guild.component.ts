import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateNumber(userId: number, number: number) {
    return this.http.put<void>('users' + userId, { number });
  }

  updateGuildInformationNumber(guildId: number, userId: number, number: number) {
    return this.http.put<void>('guilds' + guildId + '/join', { userId, number });
  }
}


@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})


export class GuildComponent {

  Name: string = "no data";
  Description: string = "no data";
  GuildMaxMembers: number = 0;
  MembersCount: number = 0;

  public GuildData: GuildInformation[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, @Inject(UserService) private userService: UserService) {
    http.get<GuildInformation[]>(baseUrl + 'Guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }

  async onJoinClick(guildId: number, userId: number) {
    
    await this.userService.updateGuildInformationNumber(guildId, userId, 1); 
  }
}

interface GuildInformation {
  name: string;
  id: number;
  description: string;
  guildMaxMembers: number;
  membersCount: number;
  userId?: number;
}






