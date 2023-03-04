import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { newUser } from '../app.component';
import { LoginSessionService } from './login-session.service';

@Injectable({
  providedIn: 'root'
})
export class TweetClientService {


  constructor(private http: HttpClient, private loginService: LoginSessionService, private router: Router) {
  }

  JWT = localStorage.getItem('token')

  public generateToken(request: any) {
    let response = this.http.post("http://localhost:8888/api/v1.0/tweets/login", request);
    return response;
  }

  public validateToken(){
    let token: any = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    let response = this.http.get("http://localhost:8888/api/v1.0/tweets/validate", { headers });
    return response;
  }

  public registerUser(user: newUser){
    let response =  this.http.post("http://localhost:8888/api/v1.0/tweets/register", user);
    return response;
  }

  public resetPassword(resetPasswordUser: any,username: any){
    let url = "http://localhost:8888/api/v1.0/tweets/" + username + "/forgot";
    let response = this.http.put(url,resetPasswordUser);
    return response;
  }

  public getAllUsers(){
    let response = this.http.get("http://localhost:8888/api/v1.0/tweets/users/all");
    return response;
  }

  public getAllTweets(){
    let response = this.http.get("http://localhost:8888/api/v1.0/tweets/all");
    return response;
  }

  public getAllTweetsByUser(username: any){
    let url = "http://localhost:8888/api/v1.0/tweets/" + username;
    let response = this.http.get(url);
    return response;
  }

  public likeTweet(tweet: any) {
    let username = localStorage.getItem('username');
    let url = "http://localhost:8888/api/v1.0/tweets/" + username + "/like/" + tweet.id;
    let response = this.http.put(url,{});
    return response;
  }

  public postTweet(tweet:any) {
    let username = localStorage.getItem('username');
    let url = "http://localhost:8888/api/v1.0/tweets/" + username + "/add";
    let response = this.http.post(url,tweet);
    return response;
  }

  public deleteTweet(tweet:any) {
    let username = localStorage.getItem('username');
    let url = "http://localhost:8888/api/v1.0/tweets/" + username + "/delete/" + tweet.id;
    let response = this.http.delete(url);
    return response;
  }

  public editTweet(tweet:any) {
    let username = localStorage.getItem('username');
    let url = "http://localhost:8888/api/v1.0/tweets/" + username + "/update/" + tweet.id;
    let response = this.http.put(url,tweet);
    return response;
  }

  public replyTweet(tweet: any, parentTweetId: any) {
    let username = localStorage.getItem('username');
    let url = "http://localhost:8888/api/v1.0/tweets/" + username + "/reply/" + parentTweetId;
    let response = this.http.post(url,tweet);
    return response;
  }

}
