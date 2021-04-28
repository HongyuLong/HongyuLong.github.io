//
//  WatchListView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import SwiftUI
import Kingfisher

struct WatchListView: View {
    @ObservedObject var watchlistVM = WatchlistViewModel()
    @Namespace var animation
    let columns = Array(repeating: GridItem(.flexible(), spacing: 10), count: 3)
    
    var body: some View {
        
        VStack {
            if watchlistVM.watchlist.count == 0 {
                Text("Watchlist is empty")
                    .font(.title)
                    .foregroundColor(.secondary)
            }
            else {
                NavigationView {
                    ScrollView(.vertical) {
                        LazyVGrid(columns: columns, spacing: 4, content: {
                            ForEach(watchlistVM.watchlist, id: \.id) { item in
                                NavigationLink(destination: DetailsView(media_type: item.media_type, media_id: item.media_id)) {
                                    RemoteImage(url: item.poster_path)
                                        .frame(height: 170)
                                        .aspectRatio(contentMode: .fit)
                                        .onDrag({
                                            watchlistVM.currentMedia = item
                                            return NSItemProvider(contentsOf: URL(string: item.poster_path))!
                                        })
                                        .onDrop(of: [.text], delegate: DragViewDelegate(media: item, wacthlistVM: watchlistVM))
                                }
                                .buttonStyle(PlainButtonStyle())
                                .contextMenu {
                                    Button(action: {
                                        watchlistVM.removedFromWatchlist(id: item.media_id, media_type: item.media_type)
                                    }) {
                                        Label("Remove from watchList", systemImage: "bookmark.fill")
                                    }
                                }
                            }
                        })
                        .padding()
                    }
                    .navigationTitle("Watchlist")
                }
                .navigationViewStyle(StackNavigationViewStyle())
                .environmentObject(watchlistVM)
            }
        }
        .onAppear(perform: {
            watchlistVM.readFromLocalStorage()
        })
//
//        NavigationView {
//            if watchlistVM.watchlist.count == 0 {
//                Text("Watchlist is empty")
//                    .font(.title)
//                    .foregroundColor(.secondary)
//            }
//            else {
//                VStack(alignment: .leading) {
//                    Text("Watchlist")
//                        .font(.title)
//                        .bold()
//                    ForEach(watchlistVM.watchlist, id: \.id) { item in
//                        NavigationLink(destination: DetailsView(media_type: item.media_type, media_id: item.id))  {
//                            KFImage(URL(string: item.poster_path))
//                                .resizable()
//                                .frame(width: 96, height: 130)
//                                .aspectRatio(contentMode: .fit)
//                                .clipped()
//                        }
//                    }
//                    Spacer()
//                }
//            }
//        }
//        .onAppear(perform: {
//            watchlistVM.readFromLocalStorage()
//        })
//        .environmentObject(watchlistVM)
        
    }
}
