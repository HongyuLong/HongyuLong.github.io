//
//  ContentView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/13.
//

import SwiftUI

struct ContentView: View {
    @State private var selection = 2
    
    var body: some View {
        TabView(selection: $selection) {
            SearchView()
                .tabItem {
                    Label("Search", systemImage: "magnifyingglass")
                    
                }
                .tag(1)
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                    
                }
                .tag(2)
            WatchListView()
                .tabItem {
                    Label("WatchList", systemImage: "heart")
                    
                }
                .tag(3)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
