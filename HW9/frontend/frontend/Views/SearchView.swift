//
//  SearchView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import UIKit
import SwiftUI
import Kingfisher

struct SearchBar: UIViewRepresentable {
    
    @Binding var text: String
    var placeholder: String
    var svm: SearchViewModel
    
    class Coordinator: NSObject, UISearchBarDelegate {
    
        @Binding var text: String
        var svm: SearchViewModel
        let debouncer = Debouncer(delay: 1)
        
        init(text: Binding<String>, svm: SearchViewModel) {
            _text = text
            self.svm = svm
        }

        func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
            text = searchText
            
            if (searchText.count >= 3) {
                debouncer.run(action: {
                    self.svm.fetchSearchData(query: searchText)
                })
            }
        }
        
        func searchBarSearchButtonClicked(_ searchBar: UISearchBar)
        {
            searchBar.setShowsCancelButton(false, animated: true)
            searchBar.endEditing(true)
        }
        
        func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
                text = ""
                searchBar.text = nil
                searchBar.showsCancelButton = false
                searchBar.endEditing(true)
        }
        
        func searchBarTextDidBeginEditing(_ searchBar: UISearchBar) {

           searchBar.setShowsCancelButton(true, animated: true)

        }
        
        func searchBarTextDidEndEditing(_ searchBar: UISearchBar) {

            searchBar.setShowsCancelButton(false, animated: true)
        }
    }
    
    func makeCoordinator() -> SearchBar.Coordinator {
        return Coordinator(text: $text, svm: svm)
    }

    func makeUIView(context: UIViewRepresentableContext<SearchBar>) -> UISearchBar {
        let searchBar = UISearchBar(frame: .zero)
        searchBar.delegate = context.coordinator
        searchBar.placeholder = placeholder
        searchBar.searchBarStyle = .minimal
        searchBar.autocapitalizationType = .none
        return searchBar
    }

    func updateUIView(_ uiView: UISearchBar, context: UIViewRepresentableContext<SearchBar>) {
        uiView.text = text
    }
    
}




struct SearchView: View {

    @ObservedObject var svm = SearchViewModel()
    @State private var searchText : String = ""
    @State private var searchResult : [SearchItem] = []
    
   
    init() {
        
    }
    
    var body: some View {
        NavigationView {
            VStack {
                SearchBar(text: $searchText, placeholder: "Search Movies, TVs...", svm: self.svm)
            
                ScrollView{
                    VStack{
                        if (self.searchText.count >= 3) {
                            
                            if(svm.hasSearch) {
                                SearchCardsView(self.searchText)
                            }
                            else {
                                Text("No Results")
                                    .font(.title)
                                    .foregroundColor(Color.gray)
                                    .padding(.top, 20)
                            }
                        }
                    }
                    .environmentObject(svm)
                }
            }
            .navigationBarTitle(Text("Search"))
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}
