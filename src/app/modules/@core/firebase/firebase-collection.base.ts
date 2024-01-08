import { initializeApp } from 'firebase/app';
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
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListDocumentSnapshot } from './@types/firebase.type';
import { FirebaseCollectionHelper } from './firebase-collection.helper';

export class FirebaseCollectionBase {
  private snapshot = new Subject<ListDocumentSnapshot>();

  public db!: Firestore;
  public _helper = new FirebaseCollectionHelper();
  public $snapshot = this.snapshot.asObservable();
  public collection!: CollectionReference<DocumentData>;

  constructor(
    private collectionName: string,
    private snapshotChangeEnable: boolean = false
  ) {
    this.#init();
  }

  public getAll<Data>(querys: QueryFieldFilterConstraint[] = []) {
    return this.handlerGetAll<Data>(querys);
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

  #init() {
    initializeApp(environment.firebase);

    this.db = getFirestore();
    this.collection = collection(this.db, this.collectionName);

    if (this.snapshotChangeEnable) {
      onSnapshot(
        this.collection,
        (snapshot) => this.snapshot.next(snapshot),
        (err) => console.log(err)
      );
    }
  }
}
