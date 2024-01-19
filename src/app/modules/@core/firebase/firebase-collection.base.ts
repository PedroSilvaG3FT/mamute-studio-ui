import { inject } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
import { ListDocumentSnapshot } from './@types/firebase.type';
import { FirebaseCollectionHelper } from './firebase-collection.helper';
import { FirebaseConnectorService } from './firebase-connector.service';

export class FirebaseCollectionBase {
  private _connector = inject(FirebaseConnectorService);
  private snapshot = new Subject<ListDocumentSnapshot>();

  public db!: Firestore;
  public app: FirebaseApp;
  public _helper = new FirebaseCollectionHelper();
  public $snapshot = this.snapshot.asObservable();
  public collection!: CollectionReference<DocumentData>;

  constructor(
    private collectionName: string,
    private snapshotChangeEnable: boolean = false
  ) {
    this.app = this._connector.app;

    this.db = getFirestore();
    this.collection = collection(this.db, this.collectionName);

    this.handleMonitoringSnapshot();
  }

  public getAll<Data>(querys: QueryFieldFilterConstraint[] = []) {
    return this.handlerGetAll<Data>(querys);
  }

  public getAllSortLimit<Data>(
    column: string,
    order: 'desc' | 'asc',
    limit: number,
    querys: QueryFieldFilterConstraint[] = []
  ) {
    return this.handlerGetAllOrderLimit<Data>(column, order, limit);
  }

  public getById<Data>(id: string) {
    return this.handlerGetById<Data>(id);
  }

  public create<Data>(payload: Data) {
    return this.handlerCreate(payload);
  }

  public update<Data>(id: string, payload: Data) {
    return this.handlerUpdate(id, payload);
  }

  public delete(id: string) {
    return deleteDoc(this.getDocumentReference(id));
  }

  public getDocumentReference(id: string, collection = this.collectionName) {
    return doc(this.db, collection, id);
  }

  public async getByColumn<Data>(column: string, value: any) {
    try {
      const snapshot = await getDocs(
        query(this.collection, where(column, '==', value))
      );

      const response = await this._helper.getCollectionData<Data>(snapshot);
      const [result] = response as Data[];

      return result || ({} as Data);
    } catch (error) {
      throw error;
    }
  }

  // #region: Protected methods
  protected async handlerGetAll<Data>(
    querys: QueryFieldFilterConstraint[] = []
  ) {
    try {
      const snapshot = await getDocs(query(this.collection, ...querys));
      return this._helper.getCollectionData<Data>(snapshot);
    } catch (error) {
      throw error;
    }
  }

  protected async handlerGetById<Data>(
    id: string,
    collection = this.collectionName
  ) {
    try {
      const snapshot = await getDoc(this.getDocumentReference(id, collection));
      return this._helper.getDocumentData<Data>(snapshot);
    } catch (error) {
      throw error;
    }
  }

  protected async handlerGetAllOrderLimit<Data>(
    column: string,
    order: 'desc' | 'asc',
    maxItems: number,
    querys: QueryFieldFilterConstraint[] = []
  ) {
    try {
      const q = query(
        this.collection,
        orderBy(column, order),
        limit(maxItems),
        ...querys
      );
      const snapshot = await getDocs(q);

      return this._helper.getCollectionData<Data>(snapshot);
    } catch (error) {
      throw error;
    }
  }

  protected async handlerCreate<Data>(payload: Data) {
    try {
      const response = await addDoc(this.collection, Object(payload));
      return response;
    } catch (error) {
      throw error;
    }
  }

  protected async handlerUpdate<Data>(id: string, payload: Data) {
    try {
      const response = await updateDoc(
        this.getDocumentReference(id),
        Object(payload)
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // #endregion: Protected methods

  private handleMonitoringSnapshot() {
    if (this.snapshotChangeEnable) {
      onSnapshot(
        this.collection,
        (snapshot) => this.snapshot.next(snapshot),
        (err) => console.log(err)
      );
    }
  }
}
