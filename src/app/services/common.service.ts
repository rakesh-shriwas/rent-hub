import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { IComments, IFavorites, IRentPost, IUser } from '../models/common.vm';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  http = inject(HttpClient);
  private apiUrl = env.api_url;

  constructor() {}

  /**
   * Get all rent post
   *
   * @return {*}  {Observable<IRentPost[]>}
   * @memberof CommonService
   */
  getRentPosts(): Observable<IRentPost[]> {
    return this.http.get<IRentPost[]>(`${this.apiUrl}/posts`);
  }

  /**
   * Get Post by id
   *
   * @param {number} userId
   * @return {*}  {Observable<IRentPost[]>}
   * @memberof CommonService
   */
  getPostDetailsById(postId: number): Observable<IRentPost[]> {
    return this.http.get<IRentPost[]>(`${this.apiUrl}/posts?id=${postId}`);
  }

  /**
   * Get favorites post by user id
   *
   * @param {number} userId
   * @return {*}  {Observable<IFavorites[]>}
   * @memberof CommonService
   */
  getFavoriteById(userId: number): Observable<IFavorites[]> {
    return this.http.get<IFavorites[]>(
      `${this.apiUrl}/favorites?userId=${userId}`
    );
  }


  /**
   * Get post comments by post id
   *
   * @param {number} postId
   * @return {*}  {Observable<IComments[]>}
   * @memberof CommonService
   */
  getCommentsByPostId(postId: number): Observable<IComments[]> {
    return this.http.get<IComments[]>(
      `${this.apiUrl}/comments?postId=${postId}&_sort=id&_order=desc`
    );
  }

  /**
   * Post a new comment on a post
   *
   * @param {IComments} obj
   * @return {*}  {Observable<IComments[]>}
   * @memberof CommonService
   */
  postAComment(obj: IComments): Observable<IComments[]> {
    return this.http.post<IComments[]>(`${this.apiUrl}/comments?postId=${obj.postId}`, obj);
  }

  /**
   * Create new rent post
   *
   * @param {IRentPost} postObj
   * @return {*}  {Observable<IRentPost>}
   * @memberof CommonService
   */
  createRentPost(postObj: IRentPost): Observable<IRentPost> {
    return this.http.post<IRentPost>(`${this.apiUrl}/`, postObj);
  }

  /**
   * Update existing post by post id
   *
   * @param {number} postId
   * @param {IRentPost} postObj
   * @return {*}  {Observable<IRentPost>}
   * @memberof CommonService
   */
  updateRentPostById(
    postId: number,
    postObj: IRentPost
  ): Observable<IRentPost> {
    return this.http.put<IRentPost>(`${this.apiUrl}/${postId}`, postObj);
  }

  /**
   * Create New User
   *
   * @param {IUser} userObj
   * @return {*}  {Observable<IUser>}
   * @memberof CommonService
   */
  createUser(userObj: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}`, userObj);
  }

  login(credentials: {
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, credentials);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
