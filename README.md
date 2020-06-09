Git Hub Hand-Book

To Create a new branch:
git checkout -b feature_branch_name

Edit, add and commit your files.
git status
git add .
git commit -m "relevant comment not test123"

Push your branch to the remote repository:

git push -u origin feature_branch_name

Rest of the group

Deleting
// delete branch locally
git branch -d localBranchName

// delete branch remotely
git push origin --delete remoteBranchName
